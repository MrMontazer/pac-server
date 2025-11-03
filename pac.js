function hostToLower(h) {
    return (h || "").toLowerCase();
}

function matchPattern(host, pattern) {
    host = hostToLower(host);
    pattern = pattern.toLowerCase();

    if (pattern.indexOf(".") === 0) {
        var p = pattern.substring(1); // remove leading dot: ".example.com" -> "example.com"
        return host === p || host.endsWith("." + p);
    }
    if (pattern.indexOf("*") !== -1) {
        var regex = new RegExp("^" + pattern.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$");
        return regex.test(host);
    }

    return host === pattern;
}

function inList(host, list) {
    if (list === null) return false;
    for (var i = 0; i < list.length; i++) {
        if (matchPattern(host, list[i])) return true;
    }
    return false;
}

function buildProxyString(fallbackToDirect) {
    var s = "";
    for (var i = 0; i < CONFIG.proxy.length; i++) {
        if (CONFIG.proxy[i].toLowerCase().startsWith("socks5 "))
            s += "SOCKS5 " + CONFIG.proxy[i].substring(7) + "; ";
        else if (CONFIG.proxy[i].toLowerCase().startsWith("https "))
            s += "HTTPS " + CONFIG.proxy[i].substring(6) + "; ";
        else if (CONFIG.proxy[i].toLowerCase().startsWith("http "))
            s += "PROXY " + CONFIG.proxy[i].substring(5) + "; ";
        else
            s += CONFIG.proxy[i] + "; ";
    }
    if (fallbackToDirect) s += "DIRECT";
    return s;
}

function FindProxyForURL(url, host) {
    host = hostToLower(host);

    // If no host (file:// etc) → direct
    if (!host) return "DIRECT";

    // Always Direct
    if (inList(host, CONFIG.always_direct))
        return "DIRECT";

    // Always Proxy
    if (inList(host, CONFIG.always_proxy))
        return buildProxyString(false); // NO direct fallback

    // Fallback
    if (inList(host, CONFIG.fallback))
        return buildProxyString(true); // proxy → direct

    // Default rule
    switch (CONFIG.default.toLowerCase()){
        case "direct": return "DIRECT";
        case "fallback": return buildProxyString(true);
        case "proxy": return buildProxyString(false);
        default: return CONFIG.default;
    }
}