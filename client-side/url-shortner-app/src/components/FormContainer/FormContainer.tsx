import * as React from 'react';
import axios from 'axios';
import { serverUrl } from '../../helpers/constants';

interface IFormContainerProps {
    updateReloadState: () => void;
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = (props) => {
    const {updateReloadState} = props;
    const [fullUrl, setFullUrl] = React.useState<string>("");
    const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
             await axios.post(`${serverUrl}/shorturl`, {
                fullUrl: fullUrl
            });
            setFullUrl("");
            updateReloadState();
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='container mx-auto p-2'>
        <div className='bg-banner my-8 rounded-xl bg-cover bg-center'>
            <div className='w-full h-full rounded-xl p-20 backdrop-brightness-50'>
            <h2 className='text-white text-4xl text-center pb-4'>URL shortner</h2>
            <p className='text-white text-center pb-2 text-xl font-extralight'>
                 paste your link here
                 </p>
                 <p className='text-white text-center pb-4 text-sm font-thin'>
                    free tool to shorten a URL or reduce a link. Use our URL Shortener to create a shortened link making it easy to remember.
                 </p>
                 <form onSubmit={HandleSubmit}>
                    <div className='flex'>
                        <div className='relative w-full'>
                            <div className='absolute'></div>
                            <input type='text' placeholder='Paste your link here' required className='block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500' value = {fullUrl}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullUrl(e.target.value)}
                            />
                            <button type='submit' className='absolute top-0 end-0 p-2.5 bg-blue-500 hover:bg-blue-700 text-white font-medium h-full py-2 px-4 rounded'>Shorten</button>
                            
                        </div>

                    </div>
                 </form>
            
        </div>
    </div>
    </div>
  );
};

export default FormContainer;
