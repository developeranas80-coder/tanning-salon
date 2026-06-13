Add-Type -AssemblyName System.Drawing

$filePath = "c:\Users\zakir\Desktop\beach-2 - Copy\public\hero_center_serum.png"
if (Test-Path $filePath) {
    Write-Host "Processing Central Product: $filePath"
    
    $srcBmp = New-Object System.Drawing.Bitmap($filePath)
    $width = $srcBmp.Width
    $height = $srcBmp.Height
    
    $destBmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($destBmp)
    
    # Set a highly expanded color key range (180 to 255) to wipe out any grey backgrounds or soft shadows cleanly!
    $attributes = New-Object System.Drawing.Imaging.ImageAttributes
    $colorLow = [System.Drawing.Color]::FromArgb(180, 180, 180)
    $colorHigh = [System.Drawing.Color]::FromArgb(255, 255, 255)
    $attributes.SetColorKey($colorLow, $colorHigh)
    
    $rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
    $g.DrawImage($srcBmp, $rect, 0, 0, $width, $height, [System.Drawing.GraphicsUnit]::Pixel, $attributes)
    
    $g.Dispose()
    $srcBmp.Dispose()
    
    $tempPath = $filePath + ".tmp.png"
    $destBmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $destBmp.Dispose()
    
    Move-Item -Path $tempPath -Destination $filePath -Force
    Write-Host "Successfully processed central product with high-range transparency"
} else {
    Write-Host "File not found: $filePath"
}
