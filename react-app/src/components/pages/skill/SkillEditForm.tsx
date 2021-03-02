import {FormikValues} from "formik";
import React, {FC} from "react";
import {Form} from "react-bootstrap-formik";
import {Skill, SkillSchema} from "../../../models";
import {AutoField} from "../../ui/AutoCompleteField/AutoCompleteField";
import {Alert, Button} from "react-bootstrap";

export interface SkillEdit extends Skill {
  originalCategory: string;
}

export type SkillEditFormProps = {
  initialValues: Partial<SkillEdit>;
  error: any;
  isLoading: boolean;
  onSubmit: (values: FormikValues) => void;
  handleSearch: (query: string) => string[];
};
export const SkillEditForm: FC<SkillEditFormProps> = ({
                                                        initialValues,
                                                        onSubmit,
                                                        error,
                                                        handleSearch,
                                                        isLoading,
                                                        ...props
                                                      }) => {
  return (
    <Form
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={SkillSchema}
      onSubmit={async (values) => await onSubmit(values)}
    >
      <Form.Input name="name" type="text" label="Skill Name"/>

      {initialValues && initialValues.originalCategory && (
        <Form.Input name="originalCategory" type="text" label="Current Skill Category" disabled={true}/>)}

      <AutoField name="category" label="Skill Category" placeholder="Search for a category..."
                 handleSearch={handleSearch}/>

      <Button variant="primary" type="submit" disabled={isLoading}>Submit</Button>

      {error && (<Alert variant="danger" className="my-3">Error Saving: {error}</Alert>)}
    </Form>
  );
}
