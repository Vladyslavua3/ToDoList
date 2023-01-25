import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {AddItemForm} from '../AddItemForm';
import {action} from "@storybook/addon-actions";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";


export default {
    title: 'TODOLIST/ItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'Button Clicked',
        },
    }
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});

AddItemFormStory.args = {
    addItem: action('Button clicked inside form'),
};


const TemplateSecond: ComponentStory<typeof AddItemForm> = (args) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>('Title is required')

    const addItem = () => {
        if (title.trim() !== "") {
            args.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler1 = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler1}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />
        <IconButton color="primary" onClick={addItem}>
            <AddBox/>
        </IconButton>
    </div>
};

export const AddItemFormStoryError = TemplateSecond.bind({});

AddItemFormStoryError.args = {
    addItem: action('Button clicked inside form with ERROR'),
};