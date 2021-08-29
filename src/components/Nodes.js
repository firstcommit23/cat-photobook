// Nodes 컴포넌트 - function 버전
// 생성된 DOM을 어디에 append할지를 $app 파라메터로 받기
// 파라메터는 구조 분해 방삭으로 할당

// TODO: app앞에 $ 쓰는 이유?
export default function Nodes({$app, initialState, onClick, onBackClick}) {
    this.state = initialState;

    // Nodes 컴포넌트를 렌더링 할 DOM을 this.$target 이라는 이름으로 생성
    this.$target = document.createElement('ul')
    this.$target.className = 'Nodes'
    $app.appendChild(this.$target)

    this.onClick = onClick
    this.onBackClick = onBackClick

    // state를 받아서 현재 컴포넌트의 statr를 변경하고 다시 렌더링 하는 함수
    this.setState = nextState => {
        this.state = nextState
        // render 함수 내에서 this.state 기준으로 렌더링을 하기 때문에,
        // 단순히 이렇게만 해주어도 상태가 변경되면 화면이 알아서 바뀜
        this.render() 
    }

    // 파라메터가 없는 Nodes의 render 함수.
    // 현재 상태(this.state) 기준으로 렌더링 합니다.
    this.render = () => {
        if (this.state.nodes) {
            const nodesTemplate = this.state.nodes.map(node => {
                const iconPath = node.type === 'FILE' ? './assets/file.png' : './assets/directory.png'

                return `
                    <div class="Node" data-node-id="${node.id}">
                        <img src="${iconPath}" />
                        <div>${node.name}</div>
                    </div> 
                `
            }).join('')

            this.$target.innerHTML = !this.state.isRoot ? `<div class="Node"><img src="/assets/prev.png"></div>${nodesTemplate}` : nodesTemplate
        }

        this.$target.querySelectorAll('.Node').forEach($node => {
            $node.addEventListener('click', (e) => {
                // dataset을 통해 data-로 시작하는 attribute를 꺼내올 수 있음
                const { nodeId } = $node.dataset
                
                if (!nodeId) {
                    this.onBackClick()
                }
    
                const selectedNode = this.state.nodes.find(node => node.id === nodeId)
    
                if (selectedNode) {
                    this.onClick(selectedNode)
                }
            })
        })
    }



    // 인스턴스화 이후 바로 render 함수를 실행하며 new로 생성되자 마자 렌더링 되도록 할 수 있음
    this.render()
}