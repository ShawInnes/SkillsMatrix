import React, {useEffect, useState} from "react";
import {FC} from "react";
import {Container, Button, Alert} from "react-bootstrap";
import {Field, FieldHookConfig, useField} from "formik";
import {Form} from "react-bootstrap-formik";
import {Form as BootstrapForm} from "react-bootstrap";
import {SkillSchema} from "models";
import {useSkillMutation, useSkillQuery} from "../../../queries";
import {useHistory} from "react-router";
import {useParams} from "react-router-dom";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {useChange} from "react-bootstrap-formik/dist/components/Form/hooks";

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
    // setInitialValues({
    //   id: data?.id,
    //   name: data?.name,
    //   category: data?.category
    // });
    setInitialValues({
      id: 1,
      name: 'C#',
      category: 'Programming Languages'
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

        <AutoField name="category" label="Skill Category"/>

        <Button variant="primary" type="submit" disabled={isLoading}>Submit</Button>

        {error && (<Alert variant="danger" className="my-3">Error Saving: {error}</Alert>)}
      </Form>
    </Container>
  );
}

export type AutoFieldProps = {
  name: string;
  label: string;
}

export const AutoField: FC<AutoFieldProps> = ({...props}) => {
  const [field, meta, helper] = useField(props);

  // Typeahead bits
  const [typeaheadIsLoading, setTypeaheadIsLoading] = useState(false);
  const [categories, setCategories] = useState<Array<any>>([]);

  const filterBy = () => true;

  const handleSearch = (query: string) => {
    console.log('handleSearch', query);
    console.log('handleSearch initial Value', meta.initialValue);
    setTypeaheadIsLoading(true);
    const list = [
      "Item 1", "Item 2", "Item 3", "Item 4", "Item 5",
      "Red 1", "Red 2", "Red 3", "Red 4", "Red 5",
      "Green 1", "Green 2", "Green 3", "Green 4", "Green 5",
      meta.initialValue
    ];

    const regex = new RegExp(`^${query}`, "ig");
    const filteredList = list.filter(obj => regex.test(obj));

    setCategories(filteredList.map(o => ({title: o})));
    setTypeaheadIsLoading(false);
  };

  useEffect(() => {
    setCategories(prevState => {
      console.log('prevState', prevState);
      return prevState.length === 0 && meta.initialValue ? [{title: meta.initialValue}] : prevState
    });
  }, [setCategories, meta]);


  return (
    <Form.Group name={field.name}>
      <BootstrapForm.Label>{props.label}</BootstrapForm.Label>
      <AsyncTypeahead
        id={field.name}
        filterBy={filterBy}
        isLoading={typeaheadIsLoading}
        minLength={2}
        delay={500}
        multiple={false}
        allowNew={true}
        labelKey="title"
        onSearch={handleSearch}
        options={categories}
        defaultInputValue={meta.initialValue}
        onChange={(selected) => {
          if (selected[0]) {
            helper.setValue(selected[0].title);
          }
        }}
        onBlur={(e) => {
          helper.setTouched(true);
        }}
        placeholder="Search for a category..."
        renderMenuItemChildren={(option, props) => (
          <>
            <span>{option.title}</span>
          </>
        )}
      />
      <BootstrapForm.Control.Feedback type="invalid">
        {meta.error}
      </BootstrapForm.Control.Feedback>
      <div>Value: {field.value}</div>
      <div>Meta Initial Value: {meta.initialValue}</div>
      <div>Meta Value: {meta.value}</div>
      <div>Categories: {JSON.stringify(categories)}</div>
    </Form.Group>
  );
}
