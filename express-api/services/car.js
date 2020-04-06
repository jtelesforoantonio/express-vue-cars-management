exports.validateData = (data) => {
  const response = {
    success: true
  };
  const errors = [];

  if (!data.hasOwnProperty('plate') || !data.plate) {
    response.success = false;
    errors.push('El campo placa es requerido');
  }
  if (!data.hasOwnProperty('brand') || !data.brand) {
    response.success = false;
    errors.push('El campo marca es requerido');
  }
  if (!data.hasOwnProperty('color') || !data.color) {
    response.success = false;
    errors.push('El campo color es requerido');
  }
  if (!data.hasOwnProperty('model') || !data.model) {
    response.success = false;
    errors.push('El campo modelo es requerido');
  }
  if (!data.hasOwnProperty('position') || !data.position) {
    response.success = false;
    errors.push('El campo posición es requerido');
  } else {
    if (!data.position.hasOwnProperty('lat') || !data.position.lat) {
      response.success = false;
      errors.push('El campo latitud es requerido');
    }
    if (!data.position.hasOwnProperty('lng') || !data.position.lng) {
      response.success = false;
      errors.push('El campo longitud es requerido');
    }
  }
  response.errors = errors;

  return response;
};

exports.validatePosition = (data) => {
  const response = {
    success: true
  };
  const errors = [];
  if (!data.hasOwnProperty('position') || !data.position) {
    response.success = false;
    errors.push('El campo posición es requerido');
  } else {
    if (!data.position.hasOwnProperty('lat') || !data.position.lat) {
      response.success = false;
      errors.push('El campo latitud es requerido');
    }
    if (!data.position.hasOwnProperty('lng') || !data.position.lng) {
      response.success = false;
      errors.push('El campo longitud es requerido');
    }
  }
  response.errors = errors;

  return response;
};
