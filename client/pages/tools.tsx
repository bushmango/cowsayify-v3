// import * as React from 'react'
// import { useState } from 'react'
// import Layout from '../components/Layout'

// import * as _ from 'lodash'

// let data = `switch (type) {
// 		case 'abc':
// 			return '123'
// 		case 'def':
// 			return '456'
// 		default:
// 			return '789'
// 	}`

// function ToolsPage(props: { data: any }) {
//   const [text, setText] = useState(data)

//   let lines = text.split('\n')

  let out = []
  out.push('const map: {[key: string]:  string} = {\n')


  let nextIsValue = false
  let nextIsDefault = false
  let __default = null


  _.forEach(lines, c => {
    let used = false
    c = c.trim()
    if (c.indexOf('case') !== -1) {
      // Regex fix
      // c = c.replace(/case\s\'(.*)\'\s\:/, 'merp')
      c = c.replace(/case\s*\'([_a-zA-Z0-9]*)\'\:\s*/, '$1')
      c = c.replace(/case\s*\'(.*)\'\:\s*/, "'$1'")
      c = '  ' + c + ':'
      out.push(c)
      nextIsValue = true
      used = true
    }

//     if (c.indexOf('default') !== -1) {
//       c = c.replace(/default\:/, '__default')
//       c = '  ' + c + ':'
//       __default = '__unset_default__'
//       nextIsDefault = true
//       out.push(c)
//       used = true
//     }

//     if (c.indexOf('return') !== -1) {
//       c = c.replace(/return\s*\'(.*)\'\s*/, "'$1'")
//       if (nextIsDefault) {
//         __default = c
//       }
//       c = ' ' + c + ',\n'
//       out.push(c)
//       nextIsValue = false
//       used = true
//     }

//     if (c.indexOf('.push(') !== -1) {
//       c = c.replace(/.*\.push\(*\'(.*)\'\)*/, "'$1'")
//       if (nextIsDefault) {
//         __default = c
//       }
//       c = ' ' + c + ',\n'
//       out.push(c)
//       nextIsValue = false
//       used = true
//     }

//     if (c.indexOf('break') !== -1) {
//       if (nextIsValue) {
//         out.push(' null,\n')
//         nextIsValue = false
//       }
//       used = true
//     }

//     if (!used) {
//       out.push('// ' + c + '\n')
//     }
//   })
//   out.push('}\n')
//   if (__default != undefined) {
//     out.push(`return lookupOrGetDefault(map, key, ${__default}) }\n\n`)
//   } else {
//     out.push(`return lookupOrThrow(map, key') }\n\n`)
//   }
//   out.push(
//     '\n\nconst getMap = (key) => { return map[key] || map[__default] }\n\n'
//   )
//   // out.push('const getMap = (key) => { return map[key] || map[__default] }\n\n')

//   const outCombined = _.join(out, '')

//   lines = _.map(lines, (l, idx) => {
//     return idx + ' - ' + l
//   })
//   const converted = _.join(lines, '\n')

//   return (
//     <Layout title="tools">
//       <div>
//         <h2>Convert switch to map</h2>

//         <textarea
//           rows={20}
//           style={{ width: '100%' }}
//           onChange={ev => {
//             setText(ev.target.value)
//           }}
//           value={text}
//         />

//         <pre>
//           Out: {'\n'}
//           {outCombined} {'\n'}
//           From:{'\n'}
//           {converted}
//         </pre>
//       </div>
//     </Layout>
//   )
// }

// export default ToolsPage
