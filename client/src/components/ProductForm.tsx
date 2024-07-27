import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
} from "@mui/material";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { Product, ProductFormParams } from "src/types/Product";
import { InputText } from "./elements/InputText";
import useCategory from "src/hooks/Category";

type ProductFormProps = {
    onSubmit: (values: ProductFormParams) => void;
    initialValues?: Product;
};

function ProductForm({ onSubmit, initialValues }: ProductFormProps) {
    const { categories } = useCategory();
    
    const validate = (values: ProductFormParams) => {
        const { title, image, category, price, description } = values;
        const errors: ValidationErrors = {};
        if (!title) errors.title = "Can nhap title vao";
        if (title && title.length < 6) errors.title = "Can nhap toi thieu 6 ky tu vao";
        if (!image) errors.image = "Can nhap image vao";
        if (!category) errors.category = "Can nhap category vao";
        if (!price) errors.price = "Can nhap price vao";
        if (price < 0) errors.price = "Giá không được thấp hơn 0";
        if (!description) errors.description = "Can nhap description vao";
        return errors;
    };

    return (
        <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={initialValues}
            render={({ values }) => {
                return (
                    <Stack>
                        <Field
                            name="title"
                            render={({ input, meta }) => (
                                <InputText input={input} label={"Title"} messageError={meta.touched && meta.error} />
                            )}
                        />
                        <Field
                            name="image"
                            render={({ input, meta }) => (
                                <InputText input={input} label={"Image"} messageError={meta.touched && meta.error} />
                            )}
                        />
                        <Field<string>
                            name="description"
                            render={({ input, meta }) => (
                                <InputText
                                    input={input}
                                    label={"Description"}
                                    messageError={meta.touched && meta.error}
                                />
                            )}
                        />
                        <Field<number>
                            name="price"
                            render={({ input, meta }) => (
                                <InputText
                                    input={input}
                                    label={"Price"}
                                    messageError={meta.touched && meta.error}
                                    type="number"
                                />
                            )}
                        />
                        <Field<string>
                            name="isShow"
                            type="checkbox"
                            render={({ input }) => {
                                return <FormControlLabel control={<Checkbox {...input} />} label="Show Product" />;
                            }}
                        />
                        <Field<string>
                            name="category"
                            render={({ input, meta }) => {      
                                
                                return (
                                    <FormControl fullWidth>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            {...input}
                                        >
                                            {categories.map((item) => (
                                                <MenuItem key={item._id} value={item._id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
                                    </FormControl>
                                );
                            }}
                        />

                        <Button type="submit" onClick={() => onSubmit(values)}>
                            Submit
                        </Button>
                    </Stack>
                );
            }}
        />
    );
}

export default ProductForm;
