<details>
  <summary>Tables</summary>
  <div>
<li>Users</li>
    
![users](https://github.com/user-attachments/assets/77543fa8-acc7-4abe-b6cf-362ef3b26c0b)

<li>ApprovalDocuments</li>
      
![approvalDocuments](https://github.com/user-attachments/assets/9e62f2eb-7840-4a3e-8e07-4ab41bd1a278)

<li>ApprovalLines</li>

![approvalLines](https://github.com/user-attachments/assets/328c87ca-1446-46e3-89b2-771859d4a3e3)


  </div>

  
</details>
<details>
  <summary>Query</summary>

  
```select d.id as documentId,
d.titme,
d.content,
d.createAt as requestedAt,
u.name as requesterName,
al.step as currentStep
from ApprovalDocuments d
INNER JOIN ApprovalLines al ON d.id = al.documentId
INNER JOIN Users u ON d.requestId = u.id
WHERE al.approverId = ${특정 사용자id}
AND al.status = 'PENDING'
AND d.status = 'PENDING'
AND NOT EXISTS (
	SELECT * FROM approvalLines prev
	WHERE prev.documentId = d.id
	AND prev.step < al.step
	AND prev.status != 'APPROVED'
	)
	ORDER BY d.creatdAt ASC
```
</details>


