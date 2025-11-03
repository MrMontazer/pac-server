# PAC (Proxy Auto-Configuration) Server

This project provides a PAC (Proxy Auto-Configuration) server that helps manage proxy settings for your network traffic.

## Features

- Dynamic proxy configuration based on URL patterns
- Support for both Docker and non-Docker deployments
- Simple and lightweight implementation

## Prerequisites

- Python 3.x
- Docker (optional, for containerized deployment)

## Installation & Running

```bash
git clone https://github.com/MrMontazer/pac-server.git
cd pac-server
```

### Running Without Docker

```bash
pip install -r requirements.txt
python main.py
```

The server will start on port 80 by default.

### Running With Docker

Build and run using Docker Compose:

```bash
docker-compose up -d
```

Or build and run using Docker directly:

```bash
docker build -t pac-server .
docker run -d -p 80:80 pac-server
```

## Configuration

### Customizing Proxy Rules

You can customize the proxy behavior by modifying the `config.yml` file. The configuration file allows you to:

- Define multiple proxy servers (HTTP, HTTPS, SOCKS5)
- Set direct access rules for specific domains/IPs
- Configure proxy rules for specific domains
- Set fallback behavior

You can configure multiple proxies by adding them to the `proxy` section. The PAC server will use them in a round-robin fashion for load balancing.

Example `config.yml`:

```yaml
proxy:
  - "http 1.1.1.1:1080"     # HTTP proxy
  # - "http 2.2.2.2:1080"   # Second HTTP proxy (load balancing)
  # - "https 1.1.1.1:1080"  # HTTPS proxy
  # - "socks5 1.1.1.1:1080" # SOCKS5 proxy

always_direct:
  - "localhost"           # Direct access without proxy
  - "127.*.*.*"           # Local network
  - "192.168.*.*"         # Local network
  # - "*.example.com"     # Wildcard domain

always_proxy:
  # - ".google.com"       # Always use proxy for these domains

fallback:                  # Try proxy first, then direct
  # - "example.com"

default: FALLBACK         # Default behavior: FALLBACK | PROXY | DIRECT
```

### System PAC URL Configuration

To use this PAC server, configure your system's proxy settings with the following URL:

```plaintext
http://<IP-ADDRESS>:80/pac
```

### How to Configure PAC URL in Different Operating Systems

#### Windows

1. Open Windows Settings
2. Go to Network & Internet > Proxy
3. Enable "Use setup script"
4. Enter the PAC URL: `http://<IP-ADDRESS>:80/pac`

#### macOS

1. Open System Preferences
2. Go to Network > Advanced > Proxies
3. Check "Automatic Proxy Configuration"
4. Enter the PAC URL: `http://<IP-ADDRESS>:80/pac`

#### Linux (Ubuntu/Debian)

1. Open System Settings
2. Go to Network > Network Proxy
3. Set Configuration to "Automatic"
4. Enter the PAC URL: `http://<IP-ADDRESS>:80/pac`

#### Android

1. Open Settings > Network & internet > Wi‑Fi (or Wi‑Fi & network)
2. Tap the connected Wi‑Fi network (or long‑press it) and choose "Modify network" or the gear icon
3. Expand "Advanced options" or "Advanced" (depends on device)
4. Under "Proxy", if there is an option for "Proxy Auto-Config" or "PAC", select it and enter the PAC URL: `http://<IP-ADDRESS>:80/pac`
