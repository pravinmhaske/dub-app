import { useSelector } from "react-redux";
import { getGistDetailsSuccess, getGistDetailsError, getGistDetailsPending } from './../redux/reducers/gist-details.reducer'
import Loader from './Loader'
import { Alert, Divider, Avatar } from 'antd';
function DisplayFilesFork(props) {

    let { files } = props;

    const GistForkRes = useSelector(getGistDetailsSuccess);
    const GistError = useSelector(getGistDetailsError);
    const isLoading = useSelector(getGistDetailsPending);

    const LoadForks = () => {

        if (GistForkRes.length && !GistError) {
            return (
                <div>
                    {GistForkRes.slice(0, 3).map((fork, index) => {
                        return (
                            <a className="flex-display" key={index} href={`https://gist.github.com/${fork.id}`} target="_blank">
                                <Avatar src={fork.user.avatar_url} /> -    <span>{fork.user.login}</span>
                            </a>

                        );
                    })}
                </div>
            );
        } else {
            return (
                <Alert message={GistError} type="error" showIcon />
            );
        }
    }

    if (isLoading) {
        return (
            <Loader></Loader>
        );
    }

    return (<div>
        <div>
            <div> Files :</div>
            <div>
                {Object.values(files).map((file, index) => {
                    return (

                        <span key={index} >
                            <a href={file.raw_url} target="_blank">

                                <Alert message={file.filename} type="info" />
                            </a>
                        </span>
                    );
                })}
            </div>
        </div>
        <Divider dashed />
        <div>
            <div> Forks :</div>
            <div>
                {GistForkRes && LoadForks()}
            </div>
        </div>
    </div>)
}

export default DisplayFilesFork