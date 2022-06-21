type TRemoveKeys = '_id' | '__v';

type TKeysObj = {
  [key in TRemoveKeys]?: string;
};

const keysToBeRemoved: TRemoveKeys[] = ['__v', '_id'];

const removeKeysHandler = (obj: TKeysObj, extraKeys = []) => {
  const keys = Object.keys(obj) as Array<keyof TKeysObj>;
  for (let index = 0; index < keys.length; index++) {
    const element = keys[index];
    if (element && [...keysToBeRemoved, ...extraKeys].includes(element)) {
      delete obj[element];
    }
  }
};

const convertToSchema = ({ _doc: data, extraKeys = [] }: any) => {
  const id = data?._id;
  const dataKeys = Object.keys(data);
  let newData = data;

  removeKeysHandler(newData, extraKeys);

  for (let index = 0; index < dataKeys.length; index++) {
    const element = dataKeys[index];
    if (element) {
      const item = data[element];
      if (Array.isArray(item)) {
        const newItem = item?.map(convertToSchema);
        newData = { ...newData, [element]: newItem };
      }
    }
  }

  return { ...newData, id };
};

export { convertToSchema };
