function isEmpty(obj) {
  let propsQty = 0;
  for (const prop in obj) {
    propsQty += 1;
  }
  return propsQty === 0;
}
