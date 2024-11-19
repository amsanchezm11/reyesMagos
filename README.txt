Pasos para activar el entorno

1 - pip install virtualenv
2 - pip install virtualenv
3 - python -m virtualenv entorno
4 - entorno/Scripts/activate    (Activar el entorno) 
5 - pip install -r .\backend\requirements.txt   (Instalamos las librerias)
6 - 6.1 Para lanzar el servidor nos vamos a la carpeta app --> cd .\backend\app\ 
    6.2 uvicorn main:app --reload