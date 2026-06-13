Add-Type -AssemblyName System.Drawing

function Remove-WhiteBackgroundFast ($filePath) {
    Write-Host "Processing Fast: $filePath"
    if (-not (Test-Path $filePath)) {
        Write-Host "File not found: $filePath"
        return
    }
    
    $bmp = New-Object System.Drawing.Bitmap($filePath)
    
    # Native C++ MakeTransparent calls - super fast!
    $bmp.MakeTransparent([System.Drawing.Color]::White)
    for ($i = 215; $i -le 255; $i++) {
        $bmp.MakeTransparent([System.Drawing.Color]::FromArgb(255, $i, $i, $i))
        # Clear slight color deviations in off-whites
        $bmp.MakeTransparent([System.Drawing.Color]::FromArgb(255, $i, $i - 1, $i))
        $bmp.MakeTransparent([System.Drawing.Color]::FromArgb(255, $i - 1, $i, $i))
        $bmp.MakeTransparent([System.Drawing.Color]::FromArgb(255, $i, $i, $i - 1))
        $bmp.MakeTransparent([System.Drawing.Color]::FromArgb(255, $i - 1, $i - 1, $i))
        $bmp.MakeTransparent([System.Drawing.Color]::FromArgb(255, $i - 1, $i, $i - 1))
        $bmp.MakeTransparent([System.Drawing.Color]::FromArgb(255, $i, $i - 1, $i - 1))
    }
    
    $tempPath = $filePath + ".tmp.png"
    $bmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    
    Move-Item -Path $tempPath -Destination $filePath -Force
    Write-Host "Successfully processed: $filePath"
}

$baseDir = "c:\Users\zakir\Desktop\beach-2 - Copy"
Remove-WhiteBackgroundFast (Join-Path $baseDir "public\hero_gold_bottle.png")
Remove-WhiteBackgroundFast (Join-Path $baseDir "public\hero_bronze_spray.png")
Remove-WhiteBackgroundFast (Join-Path $baseDir "public\hero_cream_tube.png")
Remove-WhiteBackgroundFast (Join-Path $baseDir "public\hero_lotion_jar.png")
Remove-WhiteBackgroundFast (Join-Path $baseDir "public\hero_palm_leaf.png")
Remove-WhiteBackgroundFast (Join-Path $baseDir "public\hero_monstera_leaf.png")
