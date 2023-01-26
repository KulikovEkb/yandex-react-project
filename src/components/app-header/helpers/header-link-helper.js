export function getIconType({isActive}) {
  return isActive ? 'primary' : 'secondary';
}

export function getLinkTextType({isActive}) {
  return `text text_type_main-default ${isActive ? 'text_color_primary' : 'text_color_inactive'}`;
}
