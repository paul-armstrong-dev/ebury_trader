FROM python:3.7.4
LABEL author="Paul Armstrong"

EXPOSE 5000

WORKDIR /app

COPY requirements.txt /app
RUN pip install -r requirements.txt

COPY . /app
CMD python app.py
