import {FC} from "react";
import {Matrix} from "components/Matrix/Matrix";
import {useSkillRatingsQuery} from "queries";

export const MatrixPage: FC = () => {
  const {data, isLoading} = useSkillRatingsQuery();

  return (
    <>
      <h2>Skills Matrix</h2>
      {data && (
        <Matrix data={data}/>
      )}
    </>
  )
};
 

