type TGetTypeParams = {
  isActive: boolean;
}

export function getIconType({isActive}: TGetTypeParams) {
  return isActive ? 'primary' : 'secondary';
}

export function getLinkTextType({isActive}: TGetTypeParams) {
  return `text text_type_main-default ${isActive ? 'text_color_primary' : 'text_color_inactive'}`;
}
