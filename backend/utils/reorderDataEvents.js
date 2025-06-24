function reorderData(datas) {
  // tem retornado o campo participantes antes das demais informações, para seguir a documentação foi adaptado a ordem do retorno
  if (Array.isArray(datas)) {
    return datas.map(event => {
      const data = event.toJSON();
      const { participantes, ...rest } = data;
      return {
        ...rest,
        participantes
      };
    });
  } else {
    const data = datas.toJSON();
    const { participantes, ...rest } = data;
    return {
      ...rest,
      participantes
    };
  }
}

module.exports = {
  reorderData
}