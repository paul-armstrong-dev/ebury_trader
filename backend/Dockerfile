FROM python:3.7.4
LABEL author="Paul Armstrong"
# LABEL build_date="2019-08-06"
# LABEL name="video_manager_app"

EXPOSE 5000

WORKDIR /app

COPY requirements.txt /app
RUN pip install -r requirements.txt

COPY . /app
CMD python app.py
