import React, {useState} from "react";
import {FC} from "react";
import {Container, Button, Alert} from "react-bootstrap";
import {Form} from "react-bootstrap-formik";
import {SkillSchema, Skill} from "models";
import {useAddSkillMutation} from "../../queries";
import {useHistory} from "react-router";

type RouteParams = {
  id: string
}

export const SkillEditPage: FC = () => {
  const history = useHistory();
  const initialValues: Partial<Skill> = {}
  const [error, setError] = useState<any>();
  const {mutate, status, isLoading} = useAddSkillMutation();

  return (
    <Container>
      <h2>Skill</h2>

      <Form
        initialValues={initialValues}
        validationSchema={SkillSchema}
        onSubmit={async (values) => {
          mutate({
            name: values.name,
            category: values.category
          }, {
            onSuccess: () => history.push('/skill'),
            onError: (error) => {
              setError(error.message);
            }
          })
        }}
      >
        <Form.Input name="name" type="text" label="Skill Name"/>
        <Form.Input name="category" type="text" label="Skill Category"/>

        <Button variant="primary" type="submit" disabled={isLoading}>Submit</Button>

        {error && (<Alert variant="danger" className="my-3">Error Saving: {error}</Alert>)}
      </Form>
    </Container>
  );
}

