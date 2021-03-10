function serializeToJsoin(form) {
  var f = form.serializeArray()
  var result = {}
  f.forEach((item) => {
      result[item.name] = item.value
  })
  return result
}