// style in style.scss

export const createHotspot = (angle: number, distance: number) => {
  const element = document.createElement('div');
  element.setAttribute('class', 'hotspot_parent');
  const innerDiv = document.createElement('button');
  innerDiv.setAttribute('class', 'hotspot');
  const rotate = `rotateX(${angle}deg)`;
  const scale = `scale(${12 / distance})`;
  element.setAttribute('style', `transform: ${scale};`);
  innerDiv.setAttribute('style', `transform: ${rotate} ${scale};`);
  element.appendChild(innerDiv);
  return element;
};

export const createLogo = () => {
  const element = document.createElement('div');
  const innerDiv = document.createElement('img');
  innerDiv.setAttribute('src', 'assets/img/fleche.png');
  innerDiv.setAttribute('class', 'logo');
  element.appendChild(innerDiv);
  return element;
};
