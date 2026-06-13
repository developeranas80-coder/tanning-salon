Add-Type -AssemblyName System.Drawing

function Auto-Crop-Image ($filePath) {
    Write-Host "Auto-cropping: $filePath"
    if (-not (Test-Path $filePath)) {
        Write-Host "File not found: $filePath"
        return
    }
    
    $bmp = New-Object System.Drawing.Bitmap($filePath)
    $width = $bmp.Width
    $height = $bmp.Height
    
    $minX = $width
    $maxX = 0
    $minY = $height
    $maxY = 0
    
    # Scan pixels to find bounding box of visible content (Alpha > 5)
    for ($y = 0; $y -lt $height; $y++) {
        for ($x = 0; $x -lt $width; $x++) {
            $pixel = $bmp.GetPixel($x, $y)
            if ($pixel.A -gt 5) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    
    # Check if anything was found
    if ($maxX -lt $minX -or $maxY -lt $minY) {
        Write-Host "No visible pixels found inside: $filePath"
        $bmp.Dispose()
        return
    }
    
    # Add a small padding of 6 pixels around the product
    $minX = [Math]::Max(0, $minX - 6)
    $minY = [Math]::Max(0, $minY - 6)
    $maxX = [Math]::Min($width - 1, $maxX + 6)
    $maxY = [Math]::Min($height - 1, $maxY + 6)
    
    $cropWidth = $maxX - $minX + 1
    $cropHeight = $maxY - $minY + 1
    
    # Crop using standard Clone
    $rect = New-Object System.Drawing.Rectangle($minX, $minY, $cropWidth, $cropHeight)
    $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
    $bmp.Dispose()
    
    # Save target cropped image
    $tempPath = $filePath + ".crop.png"
    $cropped.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    
    Move-Item -Path $tempPath -Destination $filePath -Force
    Write-Host "Successfully auto-cropped transparent margins for $filePath (New Dimensions: W:$cropWidth, H:$cropHeight)"
}

$baseDir = "c:\Users\zakir\Desktop\beach-2 - Copy"
Auto-Crop-Image (Join-Path $baseDir "public\hero_center_serum.png")
