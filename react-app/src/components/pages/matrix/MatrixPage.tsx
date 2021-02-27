import {FC} from "react";
import {Matrix} from "components/ui/Matrix/Matrix";
import {useSkillRatingsQuery} from "queries";
import {LoadingOverlay} from "../../ui/LoadingOverlay/LoadingOverlay";

export const MatrixPage: FC = () => {
  const {data, isLoading} = useSkillRatingsQuery();

  return (
    <>
      <LoadingOverlay isLoading={isLoading}/>

      <h2>Skills Matrix</h2>
      {data && (
        <Matrix data={data}/>
      )}
    </>
  )
};
 

