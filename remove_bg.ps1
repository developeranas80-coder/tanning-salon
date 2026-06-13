Add-Type -AssemblyName System.Drawing

function Remove-WhiteBackground ($filePath) {
    Write-Host "Processing: $filePath"
    if (-not (Test-Path $filePath)) {
        Write-Host "File not found: $filePath"
        return
    }
    
    # Load original image
    $srcBmp = New-Object System.Drawing.Bitmap($filePath)
    $width = $srcBmp.Width
    $height = $srcBmp.Height
    
    # Create a new 32bpp ARGB bitmap to support alpha transparency
    $bmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.DrawImage($srcBmp, 0, 0, $width, $height)
    $g.Dispose()
    $srcBmp.Dispose()
    
    # Perform pixel manipulation for transparent cutout
    for ($y = 0; $y -lt $height; $y++) {
        for ($x = 0; $x -lt $width; $x++) {
            $pixel = $bmp.GetPixel($x, $y)
            $r = $pixel.R
            $g = $pixel.G
            $b = $pixel.B
            
            $maxVal = [Math]::Max($r, [Math]::Max($g, $b))
            $minVal = [Math]::Min($r, [Math]::Min($g, $b))
            $diff = $maxVal - $minVal
            
            # Treat off-white pixels as transparent
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
    
    # Save to a temporary file first, then dispose and overwrite to avoid file locking
    $tempPath = $filePath + ".tmp.png"
    $bmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    
    Move-Item -Path $tempPath -Destination $filePath -Force
    Write-Host "Successfully removed background for $filePath"
}

$baseDir = "c:\Users\zakir\Desktop\beach-2 - Copy"
Remove-WhiteBackground (Join-Path $baseDir "public\hero_gold_bottle.png")
Remove-WhiteBackground (Join-Path $baseDir "public\hero_bronze_spray.png")
Remove-WhiteBackground (Join-Path $baseDir "public\hero_cream_tube.png")
Remove-WhiteBackground (Join-Path $baseDir "public\hero_lotion_jar.png")
Remove-WhiteBackground (Join-Path $baseDir "public\hero_palm_leaf.png")
Remove-WhiteBackground (Join-Path $baseDir "public\hero_monstera_leaf.png")
Remove-WhiteBackground (Join-Path $baseDir "public\hero_center_serum.png")
Remove-WhiteBackground (Join-Path $baseDir "public\hero_sachet_gold.png")
Remove-WhiteBackground (Join-Path $baseDir "public\hero_sachet_bronze.png")
