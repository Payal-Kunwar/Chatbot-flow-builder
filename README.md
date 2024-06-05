# Chatbot-flow-builder
### Created using react-flow https://reactflow.dev/
Link to project
https://payal-kunwar.github.io/Chatbot-flow-builder/
![image](https://github.com/Payal-Kunwar/Chatbot-flow-builder/assets/74529731/0472ac2f-02a3-4884-b16c-fb43d60c64d2)

- It has 2 main components
    1. Main canvas where nodes can be dropped, connection can be created (linked)
    2. Side Panel from where nodes can be dragged and editted
- The Side Panel by default renders Node Panel which provides a message node to be dragged and dropped in canvas. This can be extended.
- If a node is clicked then the Node Panel is replaced by Settings Panel
    1. It has a text area to edit the text of selected node.
    2. It also has a back button to go back to Nodes Panel
- There is a save button at the top of Side Panel.
    - It validates and renders toast message when clicked.
    - If every node has a source then success message is displayed else error message is displayed.
    - Error message
      ![image](https://github.com/Payal-Kunwar/Chatbot-flow-builder/assets/74529731/eed7fa36-fafa-4dca-91c9-da24c4dc02bf)
    - Success message
      ![image](https://github.com/Payal-Kunwar/Chatbot-flow-builder/assets/74529731/69842860-504c-47b8-aa5a-f88372cff520)
    - From a node source handle only one edge can originate.
    - From a target node node handle multiple edges can come.

