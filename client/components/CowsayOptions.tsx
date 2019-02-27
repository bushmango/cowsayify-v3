import * as React from 'react'

import styles from '../pages/cowsay.scss'

import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
const { TextArea } = Input
import Select from 'antd/lib/select'
const Option = Select.Option
import Form from 'antd/lib/form'

import * as stateUtil from '../state/stateUtil'
import * as stateCowsay from '../state/stateCowsay'
import { modes, actions } from '../state/stateCowsay'

const stateManager = stateCowsay.stateManager

const _onChange_text = ev => {
  stateManager.setState({ text: ev.target.value })
}
const _onChange_mode = val => {
  stateManager.setState({ mode: val })
}
const _onChange_action = val => {
  stateManager.setState({ action: val })
}
const _onChange_eyes = ev => {
  stateManager.setState({ eyes: ev.target.value })
}
const _onChange_tongue = ev => {
  stateManager.setState({ tongue: ev.target.value })
}
const _onChange_cow = val => {
  stateManager.setState({ cow: val })
}
const _onClick_share = () => {
  stateCowsay.doShare()
}

const CowsayOptions = () => {
  const state = stateUtil.useSubscription(stateCowsay.stateManager)

  return (
    <div className={styles.cowForm}>
      <div>
        <div className={styles.cowFormRow}>
          <div className={styles.cowFormLabel}>Text</div>
          <div className={styles.cowFormItem}>
            <TextArea
              placeholder="What should the cow say?"
              value={state.text}
              autosize
              onChange={this._onChange_text}
            />
          </div>
        </div>

        <div className={styles.cowFormRow}>
          <div className={styles.cowFormLabel}>Action</div>
          <div className={styles.cowFormItem}>
            <Select
              value={state.action}
              style={{ width: 120 }}
              onChange={_onChange_action}
            >
              {actions.map(c => (
                <Option key={c.key} value={c.key}>
                  {c.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className={styles.cowFormRow}>
          <div className={styles.cowFormLabel}>MOOd</div>
          <div className={styles.cowFormItem}>
            <Select
              value={state.mode}
              style={{ width: 120 }}
              onChange={_onChange_mode}
            >
              {modes.map(c => (
                <Option key={c.key} value={c.key}>
                  {c.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className={styles.cowFormRow}>
          <div className={styles.cowFormLabel}>Eyes</div>
          <div className={styles.cowFormItem}>
            <Input
              placeholder="Custom Eyes i.e. **"
              maxLength={2}
              value={state.eyes}
              onChange={_onChange_eyes}
            />
          </div>
        </div>
        <div className={styles.cowFormRow}>
          <div className={styles.cowFormLabel}>Tongue</div>
          <div className={styles.cowFormItem}>
            <Input
              placeholder="Custom Tongue i.e. ()"
              maxLength={2}
              value={state.tongue}
              onChange={_onChange_tongue}
            />
          </div>
        </div>

        <div className={styles.cowFormRow}>
          <div className={styles.cowFormLabel}>Cow</div>
          <div className={styles.cowFormItem}>
            <Select
              value={state.cow}
              style={{ width: 120 }}
              onChange={_onChange_cow}
            >
              {state.cowList.map(c => (
                <Option key={c} value={c}>
                  {c}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className={styles.cowFormRow}>
          <div className={styles.cowFormLabel} />
          <div className={styles.cowFormItem}>
            <Button type="primary" onClick={_onClick_share}>
              Share!
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CowsayOptions

// export default class CowsayOptions extends React.Component<{}> {
//   _onChange_text = ev => {
//     stateManager.setState({ text: ev.target.value })
//   }
//   _onChange_mode = val => {
//     stateManager.setState({ mode: val })
//   }
//   _onChange_action = val => {
//     stateManager.setState({ action: val })
//   }
//   _onChange_eyes = ev => {
//     stateManager.setState({ eyes: ev.target.value })
//   }
//   _onChange_tongue = ev => {
//     stateManager.setState({ tongue: ev.target.value })
//   }
//   _onChange_cow = val => {
//     stateManager.setState({ cow: val })
//   }
//   _onSubmit = () => {}

//   _onClick_share = () => {
//     stateCowsay.doShare()
//   }

//   render() {
//     let state = stateManager.getState()

//     return (
//       <div className={styles.cowForm}>
//         <div>
//           <div className={styles.cowFormRow}>
//             <div className={styles.cowFormLabel}>Text</div>
//             <div className={styles.cowFormItem}>
//               <TextArea
//                 placeholder="What should the cow say?"
//                 value={state.text}
//                 autosize
//                 onChange={this._onChange_text}
//               />
//             </div>
//           </div>

//           <div className={styles.cowFormRow}>
//             <div className={styles.cowFormLabel}>Action</div>
//             <div className={styles.cowFormItem}>
//               <Select
//                 value={state.action}
//                 style={{ width: 120 }}
//                 onChange={this._onChange_action}
//               >
//                 {actions.map(c => (
//                   <Option key={c.key} value={c.key}>
//                     {c.label}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//           </div>

//           <div className={styles.cowFormRow}>
//             <div className={styles.cowFormLabel}>MOOd</div>
//             <div className={styles.cowFormItem}>
//               <Select
//                 value={state.mode}
//                 style={{ width: 120 }}
//                 onChange={this._onChange_mode}
//               >
//                 {modes.map(c => (
//                   <Option key={c.key} value={c.key}>
//                     {c.label}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//           </div>

//           <div className={styles.cowFormRow}>
//             <div className={styles.cowFormLabel}>Eyes</div>
//             <div className={styles.cowFormItem}>
//               <Input
//                 placeholder="Custom Eyes i.e. **"
//                 maxLength={2}
//                 value={state.eyes}
//                 onChange={this._onChange_eyes}
//               />
//             </div>
//           </div>
//           <div className={styles.cowFormRow}>
//             <div className={styles.cowFormLabel}>Tongue</div>
//             <div className={styles.cowFormItem}>
//               <Input
//                 placeholder="Custom Tongue i.e. ()"
//                 maxLength={2}
//                 value={state.tongue}
//                 onChange={this._onChange_tongue}
//               />
//             </div>
//           </div>

//           <div className={styles.cowFormRow}>
//             <div className={styles.cowFormLabel}>Cow</div>
//             <div className={styles.cowFormItem}>
//               <Select
//                 value={state.cow}
//                 style={{ width: 120 }}
//                 onChange={this._onChange_cow}
//               >
//                 {state.cowList.map(c => (
//                   <Option key={c} value={c}>
//                     {c}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//           </div>

//           <div className={styles.cowFormRow}>
//             <div className={styles.cowFormLabel} />
//             <div className={styles.cowFormItem}>
//               <Button type="primary" onClick={this._onClick_share}>
//                 Share!
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
