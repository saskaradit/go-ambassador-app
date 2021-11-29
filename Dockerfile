FROM golang:1.16

WORKDIR /app
COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

# binary will be $(go env GOPATH)/bin/air
RUN curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin


# CMD ["go", "run", "main.go"]

# automatically run main.go
CMD ["air"]