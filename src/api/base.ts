import request from '@/utils/request';

export function uploadToken(){
    return request(
        {
            url:'/api/auth/oss/token',
            method:'GET'
        }
    );
}
