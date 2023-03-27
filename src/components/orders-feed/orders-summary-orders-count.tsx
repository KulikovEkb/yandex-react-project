import React, {FC} from "react";

const OrdersSummaryOrdersCount: FC<{header: string, count: number}> = ({header, count}) => {
  return (
    <div>
      <h3 className={`text text_type_main-medium`}>{header}</h3>
      <p className={`text text_type_digits-large`}>{count}</p>
    </div>
  )
}

export default OrdersSummaryOrdersCount;
