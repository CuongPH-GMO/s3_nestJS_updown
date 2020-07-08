#/bin/sh
# 1.  UploadFile
curl --location --request POST 'http://localhost:3000/api/upload' \
--form 'apkfile=@/E:/app-debug.apk'