import { useState } from "react";
import { Checkbox } from "@mui/material";
  import TreeItem  from '@mui/lab/TreeItem';
  import TreeView from '@mui/lab/TreeView';
  import { makeStyles } from '@mui/styles';
  import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const departmentData = [
  {
    department: "Customer Service",
    sub_departments: ["Support", "Customer Success"],
  },
  {
    department: "Design",
    sub_departments: ["Graphic Design", "Product Design", "Web Design"],
  },
];

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
  },
});

const DepartmentList= () => {
  const classes = useStyles();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelect = (
    _event: React.ChangeEvent<HTMLInputElement>,
    nodeId: string,
    subNodes?: string[]
  ) => {
    let newSelectedItems = [...selectedItems];

    const siblingNodes = departmentData
    .find((item) => item.department === nodeId)
    ?.sub_departments.map((subNode) => nodeId + "-" + subNode);

    if (subNodes) {
    if (newSelectedItems.includes(nodeId)) {
        newSelectedItems = newSelectedItems.filter(
          (item) => ![nodeId, ...(siblingNodes || [])].includes(item)
        );
      } else {
         newSelectedItems.push(nodeId, ...(siblingNodes || []));
      }
    } else {
      if (newSelectedItems.includes(nodeId)) {
        newSelectedItems = newSelectedItems.filter((item) => item !== nodeId);

         const parentNode = nodeId.split("-")[0];
        const siblingNodes = newSelectedItems.filter((item) =>
          item.startsWith(parentNode + "-")
        );
        if (siblingNodes.length === 0) {
          newSelectedItems = newSelectedItems.filter(
            (item) => item !== parentNode
          );
        }
      } else {
        newSelectedItems.push(nodeId);

          const parentNode = nodeId.split("-")[0];
        const siblingNodes = departmentData
          .find((item) => item.department === parentNode)
          ?.sub_departments.map((subNode) => parentNode + "-" + subNode);
        if (
          siblingNodes &&
          siblingNodes.every((item) => newSelectedItems.includes(item))
        ) {
          newSelectedItems.push(parentNode);
        }
      }
    }

    setSelectedItems(newSelectedItems);
  };

  const renderTree = (data: any[]) => {
    return data.map((department) => (
      <TreeItem
        key={department.department}
        nodeId={department.department}
        label={
          <div className={classes.root}>
            <Checkbox
              checked={selectedItems.includes(department.department)}
              onChange={(e) =>
                handleSelect(e, department.department, department.sub_departments)
              }
            />
            {department.department}
          </div>
        }
      >
        {department.sub_departments.map((subDepartment: string) => (
          <TreeItem
            key={subDepartment}
            nodeId={department.department + "-" + subDepartment}
            label={
              <div className={classes.root}>
                <Checkbox
                  checked={selectedItems.includes(
                    department.department + "-" + subDepartment
                  )}
                  onChange={(e) =>
                    handleSelect(
                      e,
                      department.department + "-" + subDepartment
                    )
                  }
                />
                {subDepartment}
              </div>
            }
          />
        ))}
      </TreeItem>
    ));
  };

  return (
    <Container component="main" maxWidth="md" sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
    }}>
      <Typography component="h5" variant="h5">Department List</Typography>

      <TreeView
        defaultCollapseIcon={<span>-</span>}
        defaultExpandIcon={<span>+</span>}
        defaultEndIcon={<span></span>}
      >
        {renderTree(departmentData)}
      </TreeView>
    </Container>
  );
};

export default DepartmentList;
