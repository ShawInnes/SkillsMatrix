import React, {useEffect, useState} from "react";
import {FC} from "react";
import {Container, Button, Alert} from "react-bootstrap";
import {Form} from "react-bootstrap-formik";
import {SkillSchema, Skill} from "models";
import {useSkillMutation, useSkillQuery} from "../../../queries";
import {Route, useHistory} from "react-router";
import {useParams} from "react-router-dom";

type RouteParams = {
  id: string
}

export const SkillEditPage: FC = () => {
  const history = useHistory();
  const [initialValues, setInitialValues] = useState<any>();
  const [error, setError] = useState<any>();
  const {mutate} = useSkillMutation();

  const {id} = useParams<RouteParams>();
  const {data, isLoading} = useSkillQuery(id);

  useEffect(() => {
    setInitialValues({
      id: data?.id,
      name: data?.name,
      category: data?.category
    });
  }, [data, id]);

  return (
    <Container>
      <h2>Skill</h2>

      <Form
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={SkillSchema}
        onSubmit={async (values) => {
          mutate(values, {
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

