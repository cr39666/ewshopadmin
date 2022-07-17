import request from "@/utils/request";

export function slides(params:any){
    return request(
        {
            url:'api/admin/slides',
            method:'GET',
            params,
        }
    )
}
export function addslides(data:any){
    return request(
        {
            url:'api/admin/slides',
            method:'POST',
            data,
        }
    )
}