import style from './loader.module.css';
import {LoaderSvg} from './loader.svg';
import {FC} from "react";
import {TLoaderSize} from "./types/loader-size";

const loaderSizes: { [size in TLoaderSize]: number } = {
  small: 16,
  medium: 24,
  large: 40,
  huge: 120
};

export const Loader: FC<{ size: TLoaderSize, inverse?: boolean }> = ({size, inverse = false}) => {
  const loaderColor = inverse ? '#fff' : '#3C39EC';

  const wrapperStyleKey = 'wrapper_' + size;
  return (
    <div className={style[wrapperStyleKey]}>
      <LoaderSvg color={loaderColor} size={loaderSizes[size]}/>
    </div>
  );
};