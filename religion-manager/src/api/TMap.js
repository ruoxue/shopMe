export function TMap(key) {
  console.log(123)
  return new Promise(function(resolve, reject) {
    window.init = function() {
      resolve(qq) //注意这里
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://map.qq.com/api/gljs?v=1.exp&key=" + key + "&callback=initMap";
    document.body.appendChild(script);
    // script.onerror = reject;
    document.head.appendChild(script);
  })
}
