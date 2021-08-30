import ImageView from './components/ImageView.js'
import Breadcrumb from './components/Breadcrumb.js'
import Nodes from './components/Nodes.js'
import { request } from './api.js'
import Loading from './components/Loading.js'

// nodeId: nodes 형태로 데이터를 불러올 때마다 이곳에 데이터를 쌓는다.
const cache = {}

export default function App($app) {
    this.state = {
        isRoot: false,
        nodes: [],
        depth: [],
        selectedFilePath: null,
        isLoading: false
    }

    const breadcrumb = new Breadcrumb({
        $app,
        initialState: this.state.depth
    })

    const nodes = new Nodes({
        $app,        
        initialState: {
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        },
        // 함수를 파라메터로 던지고, Nodes 내에서 click 발생시 이 함수를 호출하게 함.
        // 이러면 Nodes 내에선 click 후 어떤 로직이 일어날지 알아야 할 필요가 없음.
        onClick: async (node) => {
            try {
                if (node.type === 'DIRECTORY') {
                    if(cache[node.id]) {
                        //const nextNodes = await request(node.id)
                        this.setState({
                            ...this.state,
                            depth: [...this.state.depth, node],
                            isRoot: false,
                            nodes: cache[node.id]
                        })
                    } else {
                        const nextNodes = await request(node.id)
                        this.setState({
                            ...this.state,
                            depth: [...this.state.depth, node],
                            isRoot: false,
                            nodes: nextNodes
                        })
                        // cache update
                        cache[node.id] = nextNodes
                    }
                } else if (node.type === 'FILE') {
                    this.setState({
                        ...this.state,
                        selectedFilePath: node.filePath
                    })

                } 
            } catch(e) {
                    
            }
        },
        onBackClick: () => {
            try {
                // 이전 state를 복사하여 처리
                const nextState = { ...this.state }
                nextState.depth.pop()
                
                const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id

                // root로 온 경우이므로 root 처리
                if (prevNodeId === null) {
                    //const rootNodes = await request();
                    this.setState({
                        ...nextState,
                        isRoot: true,
                        nodes: cache.rootNodes
                    })
                } else {
                 //   const prevNodes = await request(prevNodeId)
                    this.setState({
                        ...nextState,
                        isRoot: false,
                        nodes: cache[prevNodeId],
                    })
                }
            } catch (e) {
                // 에러처리
            }
        }
    })

    const imageView = new ImageView({
        $app,
        initialState: this.state.selectedFilePath,
        onClick: e => {
            if (e.target.nodeName !== "IMG") {
                this.setState({
                    ...this.state,
                    selectedFilePath: ''
                })
            }
        }
    })

    const loading = new Loading({$app, initialState: this.state.isLoading})

    this.setState = nextState => {
        this.state = nextState
        breadcrumb.setState(this.state.depth)
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        })
        imageView.setState(this.state.selectedFilePath)
        loading.setState(this.state.isLoading)
    }

    const init = async () => {
        try {
            this.setState({
                ...this.state,
                isLoading: true
            })
            const rootNodes = await request()
            await this.setState({
                ...this.state,
                isRoot: true,
                nodes: rootNodes
            })

            // 캐시에 추가
            cache.rootNodes = rootNodes
        } catch (e) {
            // 에러 처리하기
        } finally {
            this.setState({
                ...this.state,
                isLoading: false
            })
        }
    }

    init()

    // ESC 누른경우 모달 닫기
    document.addEventListener("keyup", e => {
        if (this.state.selectedFilePath !== '' && e.key === "Escape") {

            this.setState({
                ...this.state,
                selectedFilePath: ''
            })
        }
    })
}