class CommonUtils {
  static getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  //ĐỊNH DẠNG GIÁ dấu ,
  static formatPricestring = (val) => {
    if (val) {
      let x = val.toString();
      var parts = x.toString().split(",");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }

    if (val === 0) {
      return 0;
    }

    return "NaN";
  };
}

export default CommonUtils;
