FROM python:3.12-slim

WORKDIR /usr/src/app

RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

COPY . /usr/src/app

EXPOSE 4000

CMD ["gunicorn", "--bind", "0.0.0.0:4000", "wsgi:app"]