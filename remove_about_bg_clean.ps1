Add-Type -AssemblyName System.Drawing

$filePath = "c:\Users\zakir\Desktop\beach-2 - Copy\public\about_salon.png"
if (Test-Path $filePath) {
    Write-Host "Processing About Image Clean: $filePath"
    
    # Load original image
    $srcBmp = New-Object System.Drawing.Bitmap($filePath)
    $width = $srcBmp.Width
    $height = $srcBmp.Height
    
    # Create target transparent bitmap of same dimensions
    $destBmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($destBmp)
    
    # Set a highly expanded color key range (175 to 255) to wipe out grey backgrounds, highlights, and soft shadows cleanly!
    $attributes = New-Object System.Drawing.Imaging.ImageAttributes
    $colorLow = [System.Drawing.Color]::FromArgb(175, 175, 175)
    $colorHigh = [System.Drawing.Color]::FromArgb(255, 255, 255)
    $attributes.SetColorKey($colorLow, $colorHigh)
    
    # Draw original image onto transparent bitmap using ColorKey attributes
    $rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
    $g.DrawImage($srcBmp, $rect, 0, 0, $width, $height, [System.Drawing.GraphicsUnit]::Pixel, $attributes)
    
    # Clean up file locks
    $g.Dispose()
    $srcBmp.Dispose()
    
    # Save the transparent image
    $tempPath = $filePath + ".tmp.png"
    $destBmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $destBmp.Dispose()
    
    Move-Item -Path $tempPath -Destination $filePath -Force
    Write-Host "Successfully processed about image with expanded-range transparency!"
} else {
    Write-Host "File not found: $filePath"
}
