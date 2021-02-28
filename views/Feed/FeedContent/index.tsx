import React from "react";
import useUsername from "../../../components/Header/Greeting/useUsername";
import PostPreview from "../../../components/PostPreview";
import Card from "../../../hoc/Card";

export default function FeedContent({ content }: { content: any }) {
    const { id, __typename, creator } = content;
    const { username: creatorName } = creator;
    const { username } = useUsername();
    const renderContent = () => {
        switch (__typename) {
            case "Post":
                const { title, text } = content;
                return <PostPreview text={text} title={title} />;
            default:
                return (
                    <div>
                        <p>
                            Unknown content type: {__typename} with id: {id}
                        </p>
                    </div>
                );
        }
    };

    return (
        <Card>
            {creatorName && (
                <p>By: {creatorName === username ? "you!" : creatorName}</p>
            )}
            <div>{renderContent()}</div>
            <div></div>
        </Card>
    );
}
