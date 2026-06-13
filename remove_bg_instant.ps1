Add-Type -AssemblyName System.Drawing

function Remove-WhiteBackgroundInstant ($filePath) {
    Write-Host "Processing Instant: $filePath"
    if (-not (Test-Path $filePath)) {
        Write-Host "File not found: $filePath"
        return
    }
    
    # Load original image
    $srcBmp = New-Object System.Drawing.Bitmap($filePath)
    $width = $srcBmp.Width
    $height = $srcBmp.Height
    
    # Create target transparent bitmap of same dimensions
    $destBmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($destBmp)
    
    # Set color key range to treat off-whites (210 to 255) as transparent
    $attributes = New-Object System.Drawing.Imaging.ImageAttributes
    $colorLow = [System.Drawing.Color]::FromArgb(210, 210, 210)
    $colorHigh = [System.Drawing.Color]::FromArgb(255, 255, 255)
    $attributes.SetColorKey($colorLow, $colorHigh)
    
    # Draw original image onto transparent bitmap using GDI+ ColorKey range
    $rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
    $g.DrawImage($srcBmp, $rect, 0, 0, $width, $height, [System.Drawing.GraphicsUnit]::Pixel, $attributes)
    
    # Clean up original file locks and resources
    $g.Dispose()
    $srcBmp.Dispose()
    
    # Save the transparent image
    $tempPath = $filePath + ".tmp.png"
    $destBmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $destBmp.Dispose()
    
    Move-Item -Path $tempPath -Destination $filePath -Force
    Write-Host "Successfully processed transparent cutout: $filePath"
}

$baseDir = "c:\Users\zakir\Desktop\beach-2 - Copy"
Remove-WhiteBackgroundInstant (Join-Path $baseDir "public\hero_gold_bottle.png")
Remove-WhiteBackgroundInstant (Join-Path $baseDir "public\hero_bronze_spray.png")
Remove-WhiteBackgroundInstant (Join-Path $baseDir "public\hero_cream_tube.png")
Remove-WhiteBackgroundInstant (Join-Path $baseDir "public\hero_lotion_jar.png")
Remove-WhiteBackgroundInstant (Join-Path $baseDir "public\hero_palm_leaf.png")
Remove-WhiteBackgroundInstant (Join-Path $baseDir "public\hero_monstera_leaf.png")
Remove-WhiteBackgroundInstant (Join-Path $baseDir "public\hero_center_serum.png")
