Add-Type -AssemblyName System.Drawing

function Remove-WhiteBackground ($filePath) {
    Write-Host "Processing About Image: $filePath"
    if (-not (Test-Path $filePath)) {
        Write-Host "File not found: $filePath"
        return
    }
    
    $bmp = New-Object System.Drawing.Bitmap($filePath)
    $width = $bmp.Width
    $height = $bmp.Height
    
    # Perform pixel manipulation for transparent cutout
    # Checks for white and light-grey backgrounds (threshold > 215) and blends alpha smoothly
    for ($y = 0; $y -lt $height; $y++) {
        for ($x = 0; $x -lt $width; $x++) {
            $pixel = $bmp.GetPixel($x, $y)
            $r = $pixel.R
            $g = $pixel.G
            $b = $pixel.B
            
            $maxVal = [Math]::Max($r, [Math]::Max($g, $b))
            $minVal = [Math]::Min($r, [Math]::Min($g, $b))
            $diff = $maxVal - $minVal
            
            if ($r -gt 215 -and $g -gt 215 -and $b -gt 215 -and $diff -lt 20) {
                $avg = ($r + $g + $b) / 3.0
                if ($avg -ge 246) {
                    $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                } else {
                    $factor = ($avg - 215.0) / 31.0
                    $alpha = [int]((1.0 - $factor) * 255)
                    if ($alpha -lt 0) { $alpha = 0 }
                    if ($alpha -gt 255) { $alpha = 255 }
                    $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b))
                }
            }
        }
    }
    
    # Save transparent PNG
    $tempPath = $filePath + ".tmp.png"
    $bmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    
    Move-Item -Path $tempPath -Destination $filePath -Force
    Write-Host "Successfully removed background for $filePath"
}

$baseDir = "c:\Users\zakir\Desktop\beach-2 - Copy"
Remove-WhiteBackground (Join-Path $baseDir "public\about_salon.png")
