// static-server.go
package main

import (
	"flag"
	"log"
	"net/http"
)

func main() {
	dir := flag.String("dir", ".", "directory to serve")
	addr := flag.String("addr", ":80", "address to bind to")
	flag.Parse()

	log.Printf("Serving %s on HTTP %s\n", *dir, *addr)
	http.Handle("/", http.FileServer(http.Dir(*dir)))
	log.Fatal(http.ListenAndServe(*addr, nil))
}
