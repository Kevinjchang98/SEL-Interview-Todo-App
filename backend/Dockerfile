FROM python:3.12-slim

WORKDIR /usr/src/app

RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

COPY . /usr/src/app

EXPOSE 4000

CMD ["gunicorn", "--bind", "0.0.0.0:4000", "wsgi:app"]
#
#create table if not exists tasks (
#  id              SERIAL,
#  name            VARCHAR(100) NOT NULL,
#  description     VARCHAR(1000)
#);