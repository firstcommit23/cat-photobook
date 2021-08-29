// api end point를 상수처리 해두면 나중에 변경 되었을 경우 처리하기 쉬움
const API_END_POINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev'

// const request = nodeId => {
//     // nodeId 유무에 따라 root directory를 조회할지 특정 directory를 조회할지 처리
//     fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`)
//         .then((response)=> {
//             if (!response.ok) {
//                 throw new Error('서버의 상태가 이상합니다!')
//             }
//             return response.json()
//         })
//         .catch(e => {
//             throw new Error(`무언가 잘못 되었습니다! ${e.message}`)
//         })
// }

export const request = async (nodeId) => {
    try {
        console.log(`${API_END_POINT}/${nodeId ? nodeId : ''}`)
        const res = await fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`)
        if (!res.ok) {
            throw new Error('서버의 상태가 이상합니다!')
        }

        return await res.json()
    } catch (e) {
        throw new Error(`무언가 잘못 되었습니다! ${e.message}`)
    }
}