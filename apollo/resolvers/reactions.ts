const reactions = async (parent: any, args: any, context: any, info: any) => {
    const session = context.driver.session();
    console.log({ parent });
    console.log({ args });
    console.log({ context });
    console.log({ info });
    return {
        reactions: true
    };
};

export default reactions;
