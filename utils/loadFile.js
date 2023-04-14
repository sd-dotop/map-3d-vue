export function loadJS(jsFilePath, loadCallback) {
  var _doc = document.getElementsByTagName('head')[0]
  var script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', jsFilePath)
  script.onload = script.onreadystatechange = function () {
    if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
      // console.log('loadJS done: ' + jsFilePath);
    }
    loadCallback && loadCallback()
    script.onload = script.onreadystatechange = null
  }
  _doc.appendChild(script)
}
