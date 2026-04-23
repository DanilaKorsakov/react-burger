#!/bin/bash
npm run build
scp -r ./dist/* tomodanila2@www.stellar-burgers-project.ru:/var/www/myapp/
echo "Готово!"
