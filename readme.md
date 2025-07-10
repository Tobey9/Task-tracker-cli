# Task Tracker CLI

A simple task tracker CLI

## TOOLS

Built-in node.js tools

## HOW TO USE

### 1. Clone or download the file

```bash
git clone https://github.com/Tobey9/Task-tracker-cli.git
cd task-tracker-cli
```

_No Installation required, just clone the repo_

### 2. Run Commands

**Add a task**

```bash
node task.js add "Eat spaghetti"
```

_You can change the "Eat spaghetti" to anything else_

**Update a task**

```bash
node task.js update 1 "Eat cheeseburger"
```

_You can change the "Eat cheeseburger" to anything else_

**Delete a task**

```bash
node task.js delete 1
```

_You can change 1 to any id_

**Mark as in-progress or done**

```bash
node task.js mark-in-progress 2
node task.js mark-done 2
```

_You can change 2 to any id_

**List tasks**

```bash
node task.js list
node task.js list todo
node task.js list done
node task.js list in-progress
```
