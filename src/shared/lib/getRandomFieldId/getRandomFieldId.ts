import {FieldType, GridFieldsType, KeysOnFieldsType} from "../../types";


export const getRandomFieldId = (fieldsData: GridFieldsType): KeysOnFieldsType => {

    const freeFields: KeysOnFieldsType[] = [];
    Object.values(fieldsData).forEach((field: FieldType) => {
        if (field?.isEmpty) {
            freeFields.push(field.id);
        }
    })
    const randomIndex = Math.floor(Math.random() * (freeFields.length - 1));

    return freeFields[randomIndex];
}